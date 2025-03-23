pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "vizuo/vizuo"
        DOCKER_TAG = "latest"
    }

    triggers {
        pollSCM('*/5 * * * *') // Polls Git every 5 minutes for changes
    }

    stages {
        stage('Checkout') {
            steps {
                git(
                    branch: 'main', 
                    credentialsId: 'proj-jenkins', 
                    url: 'https://github.com/ayusao/lab6.git'
                )
            }
        }

        stage('Setup Kubeconfig') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_FILE')]) {
                        sh '''
                        mkdir -p ~/.kube
                        cp $KUBECONFIG_FILE ~/.kube/config
                        chmod 600 ~/.kube/config
                        '''
                    }
                }
            }
        }

        // stage('Build and Push Docker Image') {
        //     steps {
        //         script {
        //             withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
        //                 sh '''
        //                 docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
        //                 docker build -t $DOCKER_IMAGE:$DOCKER_TAG .
        //                 docker push $DOCKER_IMAGE:$DOCKER_TAG
        //                 '''
        //             }
        //         }
        //     }
        // }

        stage('Run Ansible Playbook') {
            steps {
                script {
                    withCredentials([
                        usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD'),
                        usernamePassword(credentialsId: 'sudo-credentials', usernameVariable: 'SUDO_USER', passwordVariable: 'SUDO_PASS')
                    ]) {
                        sh '''
                        ansible-playbook deploy.yml --extra-vars "
                            docker_username=${DOCKER_USERNAME}
                            docker_password=${DOCKER_PASSWORD}
                            docker_image=${DOCKER_IMAGE}
                            docker_tag=${DOCKER_TAG}
                            ansible_become_pass=${SUDO_PASS}
                        "
                        '''
                    }
                }
            }
        }

    }
}
