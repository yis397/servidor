export interface IUser {
    id      : string;
    nombre     : string;
    apellido     : string;
    correo    : string;
    password?: string;
    rol    : string;
    estado:boolean;
    google?  :boolean;
    creado   :string;
    direccion?:string
}
export interface IProducto{
    id:string,
    nombre:string,
    cantidad:number,
    precio:number,
    img:string,
    vendedor:string,
    tags:tags
}
enum tags{
    "electronica","ropa","alimentos"
}
