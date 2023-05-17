import React from 'react';


export default function Form(){
    return(
        <form>
            <div class="from-group">
                <input type="text" class="form-control" name="name" placeholder="Product Name"/>
            </div>
            <div class="from-group">
                <input type="text" class="form-control" name="thumbnailURL" placeholder="ThumbnailURL"/>
            </div>
            <div class="from-group">
                <input type="text" class="form-control" name="sourceURL" placeholder="SourceURL"/>
            </div>
            <div class="from-group">
                <input type="text" class="form-control" name="category" placeholder="Category"/>
            </div>
            <button class="btn btn-primary btn-block">Save</button>
        </form>
    )
}