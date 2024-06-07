pipeline {
    agent any

    stages {
        stage('Clonar el Repositorio') {
            steps {
                git branch: 'main', credentialsId: 'git-jenkins', url: 'https://github.com/car-2/microproyectos-jenkins.git'
            }
        }
        stage('Construir imagen de Docker') {
            steps {
                script {
                    withCredentials([
                        string(credentialsId: 'MONGO_URL', variable: 'MONGO_URL')
                    ]) {
                        docker.build('carlosj778/microproyectos:v1', '--build-arg MONGO_URL=${MONGO_URL} .')
                    }
                }
            }
        }
        stage('Desplegar contenedores Docker') {
            steps {
                script {
                    withCredentials([
                        string(credentialsId: 'MONGO_URL', variable: 'MONGO_URL')
                    ]) {
                        sh '''
                            docker rm -f microproyectos || true
                            docker rm -f balanceador_proyectos || true
                            sed 's|\\${MONGO_URL}|${MONGO_URL}|g' docker-compose.yml > docker-compose-update.yml
                            docker-compose -f docker-compose-update.yml up -d
                        '''
                    }
                }
            }
        }
    }
}