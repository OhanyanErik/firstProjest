import searchBtn from "../../../assets/search.svg"
import "./SearchButton.css"

export default function Search(){
    return(
 <div className="search-box">
    <img src={searchBtn} alt="searchBtn" />
    <input type="text"placeholder="Search applications..."/>
        
</div>
    )
} 