import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {

 

    constructor(){
      super();
  
      console.log("hello I am a constructor from News component");
      this.state = {
        articles :  [],
        loading : false,
        page : 1,
        totalArticles: ("")
      }
    }

    async componentDidMount() {
      let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=a2ee3479e099421092f363ddbd3b6b80&page=1&pageSize=15";
      

      try{
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles , totalArticles : parsedData.totalResults})
        console.log(parsedData.totalResults)
      }
      catch(err){
          console.log(err);
      }
      
    }
    
    handlePrevClick=async()=> {
     
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=a2ee3479e099421092f363ddbd3b6b80&page=${this.state.page - 1}&pageSize=15`;
      
        let data = await fetch(url);
        let parsedData = await data.json();
        

         this.setState({

          page : this.state.page - 1,
          articles: parsedData.articles

         })

    }
    
    handleNextClick=async()=> {

      if(this.state.page+1 > Math.ceil(this.state.totalArticles/15)){

      } else {

        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=a2ee3479e099421092f363ddbd3b6b80&page=${this.state.page +1}&pageSize=15`;
        
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(this.state.totalArticles);
        
        this.setState({
          
          page : this.state.page + 1,
          articles: parsedData.articles
          
        })
      }
      }
      
  render() {
    return (
      <div className='container my-3'>
        <h1>News Monkey</h1>
       
        <div className="row my-4">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4 my-4" key={element.url}>
           <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={!element.urlToImage?"https://ichef.bbci.co.uk/news/1024/branded_news/1120D/production/_130675107_scoutsafp.jpg":element.urlToImage} newsUrl= {element.url} />
           </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>Previous</button>
          <button type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next</button>
        </div>
      </div>
    )
  }
}
