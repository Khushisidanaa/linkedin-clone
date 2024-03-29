import React , {useState} from 'react'
import './Feed.css'
import CreateIcon from '@mui/icons-material/Create';
import InputOptions from './InputOptions';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from './Post';
import { useEffect } from 'react';
import { db } from './firebase';
import { UTurnLeft } from '@mui/icons-material';

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
       db.collection('posts').onSnapshot(snapshot => (
        setPosts(snapshot.docs.map(doc => (
            {
                id: doc.id,
                data:doc.data(),
            }
        )))
       ))
    }, [])

    const sendPost = (e) => {
        e.preventDefault();

        db.collection('posts').add({
            name: 'Khushi',
            description:'Testing it'


        })
    };

  return (
    <div className='feed'>
        <div className="feed-inputcontainer">
            <div className="feed-input">
                <CreateIcon />
                <form>
                    <input type="text" />
                   <button onClick={sendPost} type='submit'>   Send </button>
                </form>
            </div>
            <div className="feed-inputOptions">
                <InputOptions Icon={ImageIcon} title='Photo' color='#70B5F9' />
                <InputOptions Icon={SubscriptionsIcon} title='Video' color='#E7A33E' />
                <InputOptions Icon={EventNoteIcon} title='Event' color='#C0CBCD' />
                <InputOptions Icon={CalendarViewDayIcon} title='Write Article' color='#7FC15E' />
            </div>
        </div>
        {posts.map((post)=>(<Post />))}
<Post name='Khushi Sidana' description='This is a test' message='Hi this is a message' />

    </div>
  )
}

export default Feed