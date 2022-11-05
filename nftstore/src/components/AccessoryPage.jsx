import * as React from 'react'
import { Header } from './Header';
import ItemCard from './ItemCard';

export const AccessoryPage = (items) => {
    return (
        <div >
             <Header/>
             <div class="container mx-auto bg-inherit">
                <div class="grid grid-cols-4 gap-6 bg-white">
                 <ItemCard></ItemCard>
                <ItemCard></ItemCard>
                <ItemCard></ItemCard>
                <ItemCard></ItemCard>
                </div>
             </div>
        </div>
       
    );
};