import React from 'react';


export default function Form(){
    return(
        <form>
            <div >
                <input type="text"  name="name" placeholder="Product Name"/>
            </div>
            <div >
                <input type="text"  name="thumbnailURL" placeholder="ThumbnailURL"/>
            </div>
            <div >
                <input type="text"  name="sourceURL" placeholder="SourceURL"/>
            </div>
            <div >
                <input type="text"  name="category" placeholder="Category"/>
            </div>
            <button >Save</button>
        </form>
    )
}