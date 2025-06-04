function Retangulo(x , y){
    this.base = x;
    this.altura = y;

    this.CalcArea = function(){
        return this.altura * this.base;
    };
}

objRetangulo = new Retangulo(5,4);


alert(objRetangulo.CalcArea());

class Conta{
    constructor(nomeCorrentista, banco, numeroConta, saldo) {
        this._nomeCorrentista = nomeCorrentista;
        this._banco = banco;
        this._numeroConta = numeroConta;
        this._saldo = saldo;
    }


get nomeCorrentista() {
return this._nomeCorrentista;
}

set nomeCorrentista(nomeCorrentista) {
this._nomeCorrentista = nomeCorrentista;
}

get banco() {
return this._banco;
}

set banco(banco) {
this._banco = banco;
}

get numeroConta() {
return this._numeroConta;
}

set numeroConta(numeroConta) {
this._numeroConta = numeroConta;
}

get saldo() {
return this._saldo;
}

set saldo(valor) {
this._saldo = valor;
}

}


class Corrente extends Conta {
constructor(nomeCorrentista, banco, numeroConta, saldo, saldoEspecial) {
super(nomeCorrentista, banco, numeroConta, saldo);
this._saldoEspecial = saldoEspecial;
}

get saldoEspecial() {
return this._saldoEspecial;
}

set saldoEspecial(valor) {
this._saldoEspecial = valor;
}
}


class Poupanca extends Conta {
constructor(nomeCorrentista, banco, numeroConta, saldo, juros, dataVencimento) {
super(nomeCorrentista, banco, numeroConta, saldo);
this._juros = juros;
this._dataVencimento = dataVencimento;
}

get juros() {
return this._juros;
}

set juros(valor) {
this._juros = valor;
}

get dataVencimento() {
return this._dataVencimento;
}

set dataVencimento(data) {
this._dataVencimento = data;
}
}


contaCorrente = new Corrente("luke","itau",12,"222529,30","3000,00");
contaPoupanca = new Poupanca("john","bradesco",123,"167,00","100,00","16/1/2025");