pipeline {
    agent any 
    
    tools {
        // Nome da sua instalação Node no Jenkins
        nodejs 'Node_Cypress' 
    }
    
    stages {
        stage('Checkout do Código') {
            steps {
                checkout scm
            }
        }
        
        stage('Instalar Dependências') {
            steps {
                sh 'npm ci' 
            }
        }
        
        // Etapa de Testes: Roda o Cypress
        stage('Executar Testes Cypress (Gera Allure-Results)') {
            steps {
                // AGORA USAMOS O NOVO SCRIPT test:ci
                sh 'npm run test:ci' 
            }
        }
        
        // Etapa de Geração de Relatório (Cria o Relatório HTML Final)
        stage('Gerar Relatório Allure') {
            steps {
                sh 'npm run allure:generate' 
            }
        }
    }
    
    // Ações Pós-Execução (PUBLICAR)
    post {
        always {
            echo 'Publicando Relatório Allure no Jenkins...'
            
          
            allure report: 'allure-report' , results: [[path: 'allure-results']] 
            
            
        }
    }
}