import React, {useState, useEffect} from 'react';
import { getLinks, getComments, getTags } from '../api'
import LinkCard from './LinkCard';
import SearchBar from './SearchBar';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Button from '@material-ui/core/Button';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';




function BookMark() {
  const [searchTerm, setSearchTerm] = useState('');
    const [links, setLinks] = useState([]);
    const [sorted, setSorted] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
          const links = await getLinks()
          const comments = await getComments()
          const tags = await getTags() 
        
          links.forEach(link => {
            link.comments = comments.filter(comment => comment.linkId === link.id).map(link => link.comment);
            link.tags = tags.filter(tag => tag.linkId === link.id).map(tag => tag.tag);
          })

          console.log(links)
          links.sort((a, b) => b.count - a.count);

          setLinks(links)
        };
     
        fetchData();
      }, [setLinks]);

      const linkMatches = (link, searchTerm) => {
  
        const searchText = searchTerm.toLowerCase();
        
      
        const url = link && link.url && link.url.toLowerCase()
        const tag = link && link.tag && link.tag.toLowerCase();
        
        if (
            (url && url.includes(searchText)) ||
            (tag && tag.includes(searchText))
        ) {
            return true;
        } else {
            return false;
        }
      };

      
      const filteredlinks = links.filter((link) => linkMatches(link, searchTerm));
      const linksToDisplay = searchTerm.length ? filteredlinks : links;
      
      const handleClick = () => {
        
        const sortedLinks = links.sort((a, b) => {

          if(sorted) {
            return a.count - b.count
          } else {
            return b.count - a.count
          }
        })

        setSorted(!sorted);
        setLinks(sortedLinks)

        
      }


  
    return (
        <div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "yellow", width:'1%', color:'brown', marginLeft:'48%', marginTop:'1%' }}
                startIcon={<ArrowUpwardIcon />}
                onClick={handleClick}
              >
               
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "brown", width:'1%', color:'yellow', marginLeft:'48%', marginTop:'1%' }}
                startIcon={<ArrowDownwardIcon />}
              >
               
              </Button>
            {/* Map over the the links, then render a linkcard for each one. Also I need to find out about the state being set already, before this gets convoluted. */}
            <div style={{display:'flex', flexDirection:'column', marginLeft:'15%', marginRight:'15%', marginTop:'5%'}}>
            {linksToDisplay.map((link, idx) => <LinkCard 
            key={`link-${idx}`}
            date={link.date}
            url={link.url}
            count={link.count}
            comments={link.comments}
            tags={link.tags}
            linkId={link.id}
            // tags={link.tags.map()}
            />)}
           </div>  
        
        </div>
    )
}

export default BookMark
