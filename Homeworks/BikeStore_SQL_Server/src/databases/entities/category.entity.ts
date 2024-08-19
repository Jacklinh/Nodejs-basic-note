import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity({name: 'categories'}) // nếu muốn thay đổi tên table trên database mặc định lấy theo `Category` thành `categories` thì ta thêm {name: 'categories'}. còn không thì sẽ lấy theo mặc định `Category`
export class Category {
    @PrimaryGeneratedColumn()
    category_id: number

    @Column()
    category_name: string

    @Column()
    description: string

    @Column()
    slug: string

    @Column()
    order: number
}