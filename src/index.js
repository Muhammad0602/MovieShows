import './style.css';
import render from './modules/homepage.js';
import { postLikes, getLikes } from './modules/likesNumber';
render(getLikes, postLikes);

postLikes("exampleId").then(res => console.log(res));
getLikes().then(res => console.log(res));
