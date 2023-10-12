import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'products',
    timestamps: true
})
export class ProductModel extends Model {
  @PrimaryKey()
  @Column({ allowNull: false })
  id: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;

}