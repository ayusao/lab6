pipeline {
    agent any

    triggers {
        pollSCM '*/5 * * * *'  // Poll GitHub every 5 minutes
    }

    environment {
        DOCKER_CREDENTIALS_ID = 'proj-jenkins'  // Jenkins credentials ID for GitHub authentication
        GITHUB_REPO = 'https://github.com/ayusao/VIZUO.git'  // GitHub repository URL
        DOCKER_IMAGE = "vizuo/vizuo:latest"  // Docker image name
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Cloning the repository from GitHub..."
                    git branch: 'main', credentialsId: "${DOCKER_CREDENTIALS_ID}", url: "${GITHUB_REPO}"
                }
            }
        }

        stage('Check Docker Access') {
            steps {
                script {
                    echo "Checking Docker and Docker Compose versions..."
                    sh 'docker --version'
                    sh 'docker-compose --version'
                    sh 'docker ps'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image: $DOCKER_IMAGE"
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Deploy using Docker Compose') {
            steps {
                script {
                    echo "Deploying using Docker Compose..."
                    sh 'docker-compose -f docker-compose.yml up --build -d'
                    sh 'docker-compose ps'  // List running containers
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline execution completed!"
        }
    }
}
