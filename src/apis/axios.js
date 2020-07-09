import axios from 'axios';

// baseURL: replace with backend url 
export default axios.create({
	baseURL: 'http://localhost:3001',
	headers: {
		headerType: 'example header type'
	}
	
});



