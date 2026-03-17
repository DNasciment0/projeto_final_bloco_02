import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { NumericTransformer } from '../../util/numerictransformer';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer(),
  })
  preco: number;

  @Column({ length: 500 })
  foto: string;

  @IsNotEmpty()
  @Column({ type: 'date', nullable: false })
  validade: Date;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Column({ type: 'int', nullable: false })
  quantidade: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;
}
