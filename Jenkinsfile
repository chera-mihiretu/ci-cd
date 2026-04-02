pipeline {
    agent any

    environment {
        IMAGE_NAME = 'devops-demo-app'
        IMAGE_TAG  = "${env.BUILD_NUMBER ?: 'latest'}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                dir('app') {
                    sh 'npm ci'
                }
            }
        }

        stage('Test') {
            steps {
                dir('app') {
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest"
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose down || true'
                sh 'docker compose up -d'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully! App is running.'
        }
        failure {
            echo 'Pipeline failed. Check the logs above for details.'
        }
    }
}
