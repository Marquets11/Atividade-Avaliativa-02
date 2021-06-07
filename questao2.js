const fs = require('fs')

// Chama a função que lê o arquivo e retorna um texto
var tabelaQuestao1 = lerArquivo()

// Separa as linhas do arquivo e joga na variável 'linhas'
linhas = tabelaQuestao1.split(/\r?\n/)

// Separa os elementos das linhas por espaço e jogando na matriz linhas[][]
for(x = 0; x < linhas.length; x++){
    linhas[x] = linhas[x].split(" ")
}

// Reuni os valores das linhas em um array só
var todosValores = unirArray(linhas)
var arrayValores = []

var resultado = ""

for(x = 0; x < todosValores.length; x++){
    // Variável que armazena a quantidade de vezes que foi adicionado
    var quantidadeAdd = 0
    var aux = []
    
    if(arrayValores.length > 0){
        while(todosValores[x] < arrayValores[arrayValores.length - 1]){
            aux.push(arrayValores.pop())                                
            quantidadeAdd += 1                                          
        }                                                               
    }

    arrayValores.push(todosValores[x])                                    
    
    if(quantidadeAdd > 0){
        resultado += " pop-" + quantidadeAdd + "x"
        resultado += " push-" + todosValores[x]
        
        while(aux.length > 0){                                            
            var pop = aux.pop()                                           
            resultado += " push-" + pop
            arrayValores.push(pop)
        }
        continue
    }
    resultado += " push-" + todosValores[x]
}

resultado = resultado.trimStart()

// Sobrescreve o arquivo 'L1Q1.out' com a tabela tratada
fs.writeFileSync("L1Q2.out", resultado);

// Ler o arquivo 'L1Q2.in' e retorna o texto dentro dele
function lerArquivo(){
    var texto = fs.readFileSync('./L1Q2.in', 'utf-8')
    return texto
}

// Unir as linhas e substituindo no array 'todosValores'
function unirArray(linhas){
    var todosValores = []

    for(x = 0; x < linhas.length; x++){
        todosValores = todosValores.concat(linhas[x])
    }

    return todosValores
}