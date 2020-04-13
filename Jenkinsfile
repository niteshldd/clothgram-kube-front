  
pipeline {
  agent any
  stages {
    stage('Docker Build') {
      steps {
        sh "docker build -t niteshldd/clothgram-dashboard:test -f ./clothgram-dashboard/Dockerfile ./clothgram-dashboard"
        sh "docker build -t niteshldd/clothgram-storefront:test -f ./clothgram-storefront/Dockerfile ./clothgram-storefront"
      }
    }
    stage('Docker Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
          sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
          sh "docker push niteshldd/clothgram-storefront:test"
          sh "docker push niteshldd/clothgram-dashboard:test"
        }
      }
    }
    stage('Apply Kubernetes Files') {
      steps {
          withKubeConfig([credentialsId: 'kubeconfig', serverUrl: 'https://api.kube.rukjaana.com']) {
          sh 'kubectl rollout restart deployment/clothgram-dashboard-deployment-test'
          sh 'kubectl get all'
        }
      }
  }
}
}

