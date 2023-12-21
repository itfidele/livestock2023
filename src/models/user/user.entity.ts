import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    UpdateResult
  } from 'typeorm'
  
  @Entity({ name: 'users' })
  export class UsersEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Index()
    public id: string
  
    @Column({ name: 'first_name', type: 'varchar', nullable: true })
    public firstName: string

    @Column({ name: 'email', type: 'varchar', unique: true, length:255 })
    public email: string
  
    @Column({ name: 'phone', type: 'varchar', nullable: true, unique: true,length:255 })
    public phone: string
    
    @Column({ name: 'password', type: 'text'})
    public password: string
  
    @Column({ name: 'is_admin', type: 'bool', default:false })
    public isAdmin: boolean
  
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    public createdAt: Date
  
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    public updatedAt: Date
  
    @UpdateDateColumn({ name: 'last_login', type: 'timestamp' })
    public lastLogin: Date
  
    public static async createUser (
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ): Promise<string> {
      const createdEntity = await this.getRepository().save({ email, password, 
         firstName, lastName})
      return createdEntity.id
    }
  
    public static async getUserById (id: string): Promise<UsersEntity> {
      return await this.getRepository().findOne(id)
    }
    
    public static async updatePassword (id: string, password: string): Promise<UpdateResult> {
      return await this.getRepository().update({ id }, { password })
    }
    public static async updateUser (id: string, params: Partial<UsersEntity>): Promise<UpdateResult> {
      return await this.getRepository().update( id , params )
    }
    public static async updateLastLogin (id: string): Promise<UpdateResult> {
      const lastLogin = new Date()
      return await this.getRepository().update({ id }, { lastLogin })
    }
  
    public static async getUserByEmail (email: string): Promise<UsersEntity> {
      return await this.getRepository().findOne({ email })
    }
  }