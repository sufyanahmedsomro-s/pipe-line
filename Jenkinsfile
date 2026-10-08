pipeline {
    agent any
    environment {
        IMAGE = 'contactapp'
        DB_PASSWORD = credentials('db-password')
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build Image') {
            steps { sh 'docker build -t ${IMAGE}:${BUILD_NUMBER} .' }
        }
        stage('Test') {
            steps { sh 'docker run --rm ${IMAGE}:${BUILD_NUMBER} npm test' }
        }
        stage('Deploy') {
            steps {
                sh 'TAG=${BUILD_NUMBER} APP_PORT=80 docker compose -p contactapp-prod up -d'
            }
        }
        stage('Verify') {
            steps {
                script {
                    def appUp = false
                    for (int i = 0; i < 6; i++) {
                        if (sh(script: 'curl -fs http://localhost:80 > /dev/null', returnStatus: true) == 0) {
                            appUp = true
                            echo "App is up"
                            break
                        }
                        echo "Waiting (${i+1}/6)"
                        sleep 10
                    }
                    if (!appUp) {
                        error "App failed to start"
                    }
                }
            }
        }
    }
}
