const fs = require('fs');

// Chama a função que lê o arquivo e retorna um texto
var tabelaQuestao1 = lerArquivo()

// Separa as linhas do arquivo e joga na variável 'linhas'
var linhas = tabelaQuestao1.split(/\r?\n/)

// Separa os elementos das linhas por espaço e jogando na matriz linhas[][]
for(x = 0; x < linhas.length; x++){
    linhas[x] = linhas[x].split(" ")
}

var tabelas = []
var somas = []

// Separar em tabelas através da função 'separartabela' e 
// com a variável 'aux' adicionar na matriz tabelas[][][]
for(x = 0; x < linhas.length; x++){
    var aux = []
    while(linhas[x].length > 0){
        aux.push(separartabela(linhas[x]))
    }
    tabelas.push(aux)
}

// Chama as funções para ordenação das tabelas
ordenartabelas(tabelas)

retirarRepetidos(tabelas)

somarTabelas(tabelas, somas)

ordenarSomas(somas)

tabelas = ordenarTabelasSoma(tabelas, somas)

// Sobrescreve o arquivo 'L1Q1.out' com a tabela tratada
fs.writeFileSync("L1Q1.out", tratarTabelaSaida(tabelas));

// Ler o arquivo 'L1Q1.in' e retorna o texto que estava no mesmo
function lerArquivo(){
    var texto = fs.readFileSync('./L1Q1.in', 'utf-8')
    return texto
}

function separartabela(arrayLinhas){
    var arrayAux = []
    arrayAux.push(arrayLinhas.shift())

    while(true){
        // Se o primeiro elemento do array for 'start' ou se o tamanho do array for 0
        // o break é chamado
        if(arrayLinhas[0] == "start" || arrayLinhas.length == 0){
            break
        }
        // Adiciona ao 'arrayAux' o primeiro elemento do 'arrayLinhas'
        arrayAux.push(arrayLinhas.shift()) 
    }

    return arrayAux
}

// Verifica se há números repetidos dentro das tabelas
function retirarRepetidos(tabelas){
    for(x = 0; x < tabelas.length; x++){
        for(y = 0; y < tabelas[x].length; y++){
            var aux = []
            aux.push(tabelas[x][y][0])
            
            for(z = 1; z < tabelas[x][y].length; z++){  
                // Se encontrar o número repetido ele ignora e não adiciona ao array 'aux'
                if(!aux.includes(tabelas[x][y][z])){
                    aux.push(tabelas[x][y][z])
                }
            }
            
            // Substitiu a tabelas pela variável 'aux' atualizada
            tabelas[x][y] = aux
        }
    }
}

// Função que realiza as somas dos valores da tabela
function somarTabelas(tabelas, somas){
    for(x = 0; x < tabelas.length; x++){
        var somasy = []
        
        for(y = 0; y < tabelas[x].length; y++){
            var soma = 0
            
            // Efetua a soma dos valores da tabela
            for(z = 1; z < tabelas[x][y].length; z++){
                if(tabelas[x][y][z] > 0){
                    soma += parseInt(tabelas[x][y][z])
                }
            }
            somasy.push({soma, x, y})
        }
        somas.push(somasy)
    }
    
    // Verifica repetição nas somas
    let valorRepetido = []
    for(x = 0; x < somas.length; x++){
        let aux = []
        let valorRepetidoAux = []
        
        for(y = 0; y < somas[x].length; y++){
            for(z = 0; z < aux.length; z++){
                if(aux[z].soma == somas[x][y].soma){
                    // Se não ocorrer repetição, adiciona
                    if(!valorRepetidoAux.includes(somas[x][y])){
                        valorRepetidoAux.push(somas[x][y])
                    }
                    // Se não ocorrer repetição, adiciona
                    if(!valorRepetidoAux.includes(aux[z])){
                        valorRepetidoAux.push(aux[z])
                    }
                }
            }
            aux.push(somas[x][y])
        }
        valorRepetido.push(valorRepetidoAux)
    }
    
    for(x = 0; x < valorRepetido.length; x++){
        for(y = 0; y < valorRepetido[x].length; y++){
            for(z = 1; z < tabelas[valorRepetido[x][y].x][valorRepetido[x][y].y].length; z++){
                if(tabelas[valorRepetido[x][y].x][valorRepetido[x][y].y][z] < 0){
                    valorRepetido[x][y].soma += parseInt(tabelas[valorRepetido[x][y].x][valorRepetido[x][y].y][z])
                }
            }
        }
    }
}

// Ordena as tabelas utilizando o insertion sort
function ordenartabelas(tabelas){
    for(x = 0; x < tabelas.length; x++){
        for(y = 0; y < tabelas[x].length; y++){
            insertionSort(tabelas[x][y])
        }
    }
}

// Ordena as tabelas da soma
function ordenarTabelasSoma(tabelas, somas){
    var newList = []
    
    for(x = 0; x < somas.length; x++){
        var aux = []
        for(y = 0; y < somas[x].length; y++){
            aux.push(tabelas[somas[x][y].x][somas[x][y].y])
        }
        newList.push(aux)
    }
    
    return newList
}

// Ordenando as somas através de um insertion sort
function ordenarSomas(somas){
    for(x = 0; x < somas.length; x++){
        insertionSort2(somas[x])
    }
}

// Método de ordenação 'insertion sort'
function insertionSort(_array) {
    let array = _array
    
    let n = array.length;
    
    for (let x = 2; x < n; x++) {
        let current = array[x]
        let y = x-1
        while ((y > -1) && (parseInt(current) < parseInt(array[y]))) {
            array[y+1] = array[y]
            y--
        }
        array[y+1] = current
    }
}

// Método de ordenação 'insertion sort'
function insertionSort2(_array) {
    let tamanhoArray = _array.length

    for (let x = 1; x < tamanhoArray; x++) {
        let current = _array[x]
        let y = x-1
        while ((y > -1) && (current.soma < _array[y].soma)) {
            _array[y+1] = _array[y]
            y--
        }
        _array[y+1] = current
    }
}

// Tratamento da tabela para exibição
function tratarTabelaSaida(_tabela){
    var tabela = ""
    
    // Formata a tabela para voltar ao formato padrão
    for(x = 0; x < _tabela.length; x++){
        var aux = _tabela[x].toString()
        aux = aux.split(",").join(" ")
        if(x+1 != _tabela.length){
            aux = aux + "\n"
        }

        tabela += aux
    }

    return tabela
}