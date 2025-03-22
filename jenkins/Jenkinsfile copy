pipeline {
    agent any

    triggers {
        pollSCM '*/5 * * * *'  // Poll GitHub every 5 minutes
    }

    environment {
        DOCKER_CREDENTIALS_ID = 'proj-jenkins'  // Jenkins credentials ID for GitHub authentication
        GITHUB_REPO = 'https://github.com/ayusao/VIZUO.git'  // GitHub repository URL
        DOCKER_IMAGE = "vizuo:latest"  // Docker image name
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

        stage('Build and Push Docker Image') {
            agent {
                docker {
                    image 'docker:latest'
                    args '--privileged -v /var/run/docker.sock:/var/run/docker.sock -e HOME=/tmp'
                    reuseNode true
                }
            }
            steps {
                script {
                    echo "Building Docker image..."
                    sh 'docker build -t $DOCKER_IMAGE .'
                    
                    echo "Pushing Docker image to the registry..."
                    sh 'docker push $DOCKER_IMAGE'  // Optionally, push to a registry
                }
            }
        }

        stage('Deploy to Kubernetes') {
            agent {
                docker {
                    image 'bitnami/kubectl:latest'
                    args '--privileged -v /var/run/docker.sock:/var/run/docker.sock -e HOME=/tmp'
                    reuseNode true
                }
            }
            steps {
                script {
                    echo "Deploying to Kubernetes..."
                    sh 'kubectl apply -f deployment.yaml'
                    sh 'kubectl rollout restart deployment vizuo-app'  // Restart the deployment if needed
                }
            }
        }
    }

    post {
        success {
            echo "CI/CD Pipeline completed successfully!"
        }
        failure {
            echo "CI/CD Pipeline failed!"
        }
    }
}