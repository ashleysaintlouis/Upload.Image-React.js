import React, {useState} from "react";
import axios from 'axios';

const ImageUpload = () => {
    const [imagem, setImagem] = useState(null);

    const handleFileChange = (e) => {
        setImagem(e.target.files[0]);
    };

    const handleUpload = async () => {
        try
        {
            const formData = new FormData();
            formData.append('imagem', imagem);

            const response = await axios.post('http://localhost:3001/upload', formData);
            console.log('ID da imagem no banco de dados : ', response.data.id);
        } catch(error){
            console.error('Erro ao fazer o upload da imagem: ', error);
        }
    }
    return (
        <div>
            <input type="file" onChange={handleFileChange}/>
            <button onClick={handleUpload}>Enviar</button>
        </div>
    );
}
export default ImageUpload;
