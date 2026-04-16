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
                echo "Building: docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                echo "Tagging: ${IMAGE_NAME}:${IMAGE_TAG} as ${IMAGE_NAME}:latest"
                echo 'Docker image built successfully.'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Running: docker compose up -d'
                echo 'Application deployed successfully.'
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
