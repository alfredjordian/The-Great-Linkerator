import React, {useState, useEffect} from 'react';
import { getLinks } from '../api'
import LinkCard from './LinkCard'





function BookMark() {
    const [links, setLinks] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const result = await getLinks()
            
          const links = result
          
          setLinks(links)
        };
     
        fetchData();
      }, [setLinks]);

      console.log(links)
    return (
        <div>
            
            
            {/* Map over the the links, then render a linkcard for each one. Also I need to find out about the state being set already, before this gets convoluted. */}
            <div style={{display:'flex', flexDirection:'column', marginLeft:'15%', marginRight:'15%', marginTop:'5%'}}>
            {links.map((link, idx) => <LinkCard 
            key={`link-${idx}`}
            date={link.date}
            url={link.url}
            count={link.count}
            comments={link.comments}
            // tags={link.tags.map()}
            />)}
           </div>  
        
        </div>
    )
}

export default BookMark
