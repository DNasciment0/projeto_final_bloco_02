import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { NumericTransformer } from '../../util/numerictransformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
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
  @ApiProperty()
  preco: number;

  @Column({ length: 500 })
  @ApiProperty()
  foto: string;

  @IsNotEmpty()
  @Column({ type: 'date', nullable: false })
  @ApiProperty()
  validade: Date;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Column({ type: 'int', nullable: false })
  @ApiProperty()
  quantidade: number;

  @ApiProperty({ type: () => Categoria })
  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;
}
