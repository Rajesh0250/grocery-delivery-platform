pipeline {
  agent any
  stages {
    stage('Build Frontend') {
      steps {
        sh 'cd frontend && npm install && npm run build'
      }
    }
    stage('Build Auth Service') {
      steps {
        sh 'cd backend/services/auth-service && mvn -q -DskipTests package'
      }
    }
  }
}
