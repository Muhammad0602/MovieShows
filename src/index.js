import './style.css';
import render from './modules/homepage.js';
import { postLikes, getLikes } from './modules/likesNumber.js';

render(getLikes, postLikes);
