#! /bin/bash
set -e

export INGRESS_INTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-internal-annotations.yaml
export INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-external-annotations.yaml
export CONFIGMAP_VALUES=$HOF_CONFIG/configmap-values.yaml
export NGINX_SETTINGS=$HOF_CONFIG/nginx-settings.yaml
export FILEVAULT_NGINX_SETTINGS=$HOF_CONFIG/filevault-nginx-settings.yaml
export FILEVAULT_INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/filevault-ingress-external-annotations.yaml

kd='kd --insecure-skip-tls-verify --timeout 10m --check-interval 10s'

deploy_redis() {
  if [[ "${REDIS_PERSISTENCE_ENABLED}" == "true" && -z "${REDIS_PERSISTENCE_EXISTING_CLAIM}" ]]; then
    $kd -f kube/redis/redis-persistent-volume-claim.yml
  fi

  $kd -f kube/redis/redis-service.yml \
    -f kube/redis/redis-network-policy.yml \
    -f kube/redis/redis-deployment.yml
}

delete_redis() {
  if [[ "${REDIS_PERSISTENCE_ENABLED}" == "true" && -z "${REDIS_PERSISTENCE_EXISTING_CLAIM}" ]]; then
    $kd --delete -f kube/redis/redis-persistent-volume-claim.yml
  fi

  $kd --delete -f kube/redis/redis-service.yml \
    -f kube/redis/redis-network-policy.yml \
    -f kube/redis/redis-deployment.yml
}

set_redis_persistence_settings() {
  export REDIS_PERSISTENCE_ENABLED=$(echo "${REDIS_PERSISTENCE_ENABLED:-false}" | tr '[:upper:]' '[:lower:]')
  export REDIS_PERSISTENCE_ACCESS_MODES=${REDIS_PERSISTENCE_ACCESS_MODES:-ReadWriteOnce}
  export REDIS_PERSISTENCE_STORAGE_CLASS=${REDIS_PERSISTENCE_STORAGE_CLASS:-gp2-encrypted}
  export REDIS_PERSISTENCE_EXISTING_CLAIM=${REDIS_PERSISTENCE_EXISTING_CLAIM:-}

  if [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
    export REDIS_PERSISTENCE_ENABLED=true
    export REDIS_PERSISTENCE_SIZE=10Gi
  elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
    export REDIS_PERSISTENCE_ENABLED=true
    export REDIS_PERSISTENCE_SIZE=1Gi
  else
    export REDIS_PERSISTENCE_ENABLED=false
  fi
}

if [[ $1 == 'tear_down' ]]; then
  export KUBE_NAMESPACE=$BRANCH_ENV
  export DRONE_SOURCE_BRANCH=$(cat /root/.dockersock/branch_name.txt)
  set_redis_persistence_settings

  $kd --delete -f kube/configmaps/configmap.yml
  $kd --delete -f kube/file-vault -f kube/app
  delete_redis
  echo "Torn Down Branch - $APP_NAME-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  exit 0
fi

export KUBE_NAMESPACE=$1
export DRONE_SOURCE_BRANCH=$(echo $DRONE_SOURCE_BRANCH | tr '[:upper:]' '[:lower:]' | tr '/' '-')
set_redis_persistence_settings

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  $kd -f kube/configmaps -f kube/certs
  $kd -f kube/file-vault/file-vault-ingress.yml 
  deploy_redis
  $kd -f kube/file-vault -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml
  $kd -f kube/file-vault/file-vault-ingress.yml
  deploy_redis
  $kd -f kube/file-vault -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml -f kube/app/service.yml
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/app/ingress-internal.yml -f kube/app/networkpolicy-internal.yml
  deploy_redis
  $kd -f kube/file-vault -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml  -f kube/app/service.yml
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/app/ingress-external.yml -f kube/app/networkpolicy-external.yml
  deploy_redis
  $kd  -f kube/file-vault -f kube/app/deployment.yml
fi

sleep $READY_FOR_TEST_DELAY

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  echo "External Branch url - $APP_NAME-$DRONE_SOURCE_BRANCH.$BRANCH_ENV.homeoffice.gov.uk"
  echo "Internal Branch url - $APP_NAME-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  echo "File Vault Branch - fv-$DRONE_SOURCE_BRANCH.$BRANCH_ENV.homeoffice.gov.uk"
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  echo "External UAT url - $APP_NAME.uat.sas-notprod.homeoffice.gov.uk"
  echo "Internal UAT url - $APP_NAME.internal.uat.sas-notprod.homeoffice.gov.uk"
  echo "File Vault UAT url - fv-$APP_NAME.uat.sas-notprod.homeoffice.gov.uk"
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  echo "External UAT url - $APP_NAME.stg.sas-notprod.homeoffice.gov.uk"
  echo "Internal UAT url - $APP_NAME.internal.stg.sas.homeoffice.gov.uk"
  echo "File Vault UAT url - fv-$APP_NAME.stg.sas.homeoffice.gov.uk"
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  echo "External PROD url - $PRODUCTION_URL"
  echo "File Vault Prod url - fv-$APP_NAME.sas.homeoffice.gov.uk"
fi


