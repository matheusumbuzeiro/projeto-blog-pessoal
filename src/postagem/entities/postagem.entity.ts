import { IsNotEmpty } from "class-validator"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Tema } from "../../tema/entities/tema.entity"

@Entity({ name: "tb_postagens" }) // Indicando que a classe é uma entidade/model
export class Postagem {

    @PrimaryGeneratedColumn() // chave primaria e auto incremental
    id: number

    @IsNotEmpty() // validador de objeto
    @Column({ length: 100, nullable: false }) // tamanho maximo 100
    titulo: string

    @IsNotEmpty() // validador de objeto
    @Column({ length: 1000, nullable: false }) // tamanho maximo 1000
    texto: string

    @UpdateDateColumn()
    data: Date

    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema

}