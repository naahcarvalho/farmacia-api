import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_produtos"})
export class Produto {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100, nullable: false })
    nome: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    preco: number;

    @Column({ length: 255, nullable: true })
    descricao?: string;

    @Column({ type: 'int', nullable: false })
    quantidade: number;

    @CreateDateColumn()
    dataCadastro: Date;

    @UpdateDateColumn()
    dataAtualizacao: Date;
}
