import api from "../../services/api"
import { useEffect, useState } from "react"
import Button from "../../components/Button"
import TopBackground from "../../components/TopBackground"
import { Title } from "../home/styles"
import { AvatarUser, CardUsers, Container, ContainerUsers, TrashIcon } from "./styles"
import Trash from '../../assets/trash.svg'
import { useNavigate } from 'react-router-dom'


function ListUsers() {
      const navigate = useNavigate()
    // toda vez que a tela carrega, o useEffect é chamado e toda vez que uma determinada variavel muda de valor
    const [users, setUsers] = useState([])

    useEffect(() => {

        async function getUsers() {
            const { data } = await api.get('/usuarios')

            setUsers(data)
        }
        getUsers()
    }, [])

    async function deleteUsers(id) {
        await api.delete(`/usuarios/${id}`)

        const updateUsers= users.filter (user => user.id !== id)
        setUsers(updateUsers)
    }


    return (
        <Container>
            <TopBackground />
            <Title>Lista de Usuários</Title>
            <ContainerUsers>
                {users.map((user) => (
                    <CardUsers key={user.id}>
                        <AvatarUser src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${user.id}`}/>
                        <div>
                            <h3>{user.name}</h3>
                            <p>{user.age}</p>
                            <p>{user.email}</p>
                        </div>
                        <TrashIcon src= {Trash} alt= 'icone-lixo' onClick={() => deleteUsers(user.id)}/>
                    </CardUsers>
                ))

                }
            </ContainerUsers>

            <Button type='button' onClick={() => navigate('/')} >Voltar</Button>
        </Container>
    )
}

export default ListUsers