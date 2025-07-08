import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Produto } from "../../produtos/entities/produto.entity";

@Entity({name: "tb_categorias"})
export class Categoria {

    @PrimaryGeneratedColumn()    
    id: number

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    nome: string;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    descricao: string

    @UpdateDateColumn()
    data: Date

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto: Produto[]
}