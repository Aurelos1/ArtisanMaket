import axios from 'axios';

const getOwnerName = async (ownerId) => {
    try {
        const response = await axios.get(`http://localhost:8000/user/${ownerId}`);
        const owner = response.data;
        console.log(owner);
        return owner.nom+" "+owner.prenom;
    } catch (error) {
        console.error('Error fetching owner:', error);
        return null;
    }
};

export default getOwnerName;