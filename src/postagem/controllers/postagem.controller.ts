import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../services/postagem.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("/postagens")
export class PostagemController {
    constructor (private readonly postagemService: PostagemService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
    }

    @Get("/:id_post")
    @HttpCode(HttpStatus.OK)
    findById(@Param('id_post', ParseIntPipe) id_post : number ): Promise<Postagem> {
        return this.postagemService.findById(id_post)
    }

    @Get('/titulo/:titulo') // postagem/ titulo/ texto
    @HttpCode (HttpStatus.OK)
    findAllByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
        return this.postagemService.findAllByTitulo(titulo);
    }

    @Post () // Cadastrar/ criar/ salvar informações
    @HttpCode(HttpStatus.CREATED) // 201
    create(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.create(postagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.update(postagem);
    }

    @Delete ('/:id')
    @HttpCode (HttpStatus.NO_CONTENT) // 204
    delete(@Param('id', ParseIntPipe)id: number){
        return this.postagemService.delete(id)
    }


}