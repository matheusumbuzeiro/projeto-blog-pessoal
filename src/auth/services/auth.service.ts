import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';


@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ){ }

       // Método usado para validar o usuário
    async validateUser(username: string, password: string): Promise<any>{

        const buscaUsuario = await this.usuarioService.findByUsuario(username)

        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        // Faz a comparação entre a senha criptografada no banco com a que está vindo pela requisição
        const matchPassword = await this.bcrypt.compararSenhas(password, buscaUsuario.senha)

        if(buscaUsuario && matchPassword){
            const { senha, ...resposta } = buscaUsuario
            return resposta
        }

        return null

    }

    async login(usuarioLogin: UsuarioLogin){

        const payload = { sub: usuarioLogin.usuario }

        /*
            objeto que vem pelo corpo da requisição => usuarioLogin = { usuario: "email@email.com", senha: "12345678" }
            objeto criado => payload = { sub: "email@email.com"}
        */

        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario)

        return{
            id: buscaUsuario?.id, // Colocamos ? pois o buscaUsuario pode retornar nulo. Caso existir (?) tenta acessar o id
            nome: buscaUsuario?.nome,
            usuario: usuarioLogin.usuario,
            senha: '',
            foto: buscaUsuario?.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,// Cria o Token JWT, criptografando alguns dados como o email do usuário que acabou de logar
        }
        

    }
}