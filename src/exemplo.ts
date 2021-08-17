
// typescript é tipado
let motor: boolean;
motor = true;
let idade: number; // int e float e double
idade = 20;
let nome: string;
nome = "Lucas Dias";
console.log(` Motor: ${motor} Idade: ${idade} Nome: ${nome}`)

let coisa: any; // recebe qualquer coisa
coisa = 10;
coisa = "dez";
coisa = true;

// vetores ou arrays
let jogadores = ["lucas dias", "lucão", "georginho", "david jackson", "jonatan"]
let times: Array<string>;
times = ["Sesi Franca", "São Paulo", "Bauru", "Pinheiros"];

console.log(`Jogadores ${jogadores}`)
console.log(`Times ${times}`)

// exemplo de interface
interface  Aluno {
    nome: string;
    nota: number;
    aprovado: boolean;
    situacao(): string; // função
}

let zeca: Aluno = {
    nome: "José da Silva Xavier",
    nota: 9,
    aprovado: false,
    situacao: function () {
        if (this.aprovado){
            return (`Aprovado`)
        }
        else {
            return (`Reprovado`)
        }
    }
}
console.log(zeca)
console.log(`${zeca.nome} ${zeca.nota} ${zeca.situacao()}`)


// interface com classe
interface Saudacao {
    bomDia(): string,
    boaTarde(): string
}

// implementa herança
// criando uma classe
class Funcionario {
    // variável protegida que pode ser herdada
    protected atividade: string
    constructor(atividade: string){ // método construtor
        this.atividade = atividade
    }
    public exercerCargo(): void {
        console.log(`A atividade é ${this.atividade}`)
    }
}

class Docente extends Funcionario implements Saudacao {

    private name: string;

    constructor(name: string, atividade: string){
        super(atividade); // chama construtor da Docente
        this.name = name;
    }

    bomDia(): string {
        this.exercerCargo()
        return `Bom dia com alegria, ${this.name} ` 
    }
    boaTarde(): string {
        this.exercerCargo()
        return `Boa tarde a todos, ${this.name}`
    }
}

let obj = new Docente("Daniel", "coordenador");
console.log(obj.boaTarde());
console.log(obj.bomDia());
