import React from "react"
import Layout from "./Scroller/Layout";
import GalleryDiv from "./Scroller/GalleryDiv";
import Link from 'next/link'
import scrollerStyles from '/styles/Scroller.module.css'
import containerStyles from '/styles/Container.module.css'

export default function Categories({data}) {

    console.log({data})
    return data.map(({id, category, topic: topics}) => (
            
            <section className={containerStyles.category} key={`category-${id}`}>
                <Layout>
                    <h3>{category}</h3>
                    <GalleryDiv>
                        {topics.map( ({name, id}) => 
                        <Link href={`/topics/${id}`} prefetch={false}>
                            <li className={scrollerStyles.topicbox} key={id}>
                                <p className={scrollerStyles.topiclabel}>{name}</p>
                            </li>
                        </Link>
                        )}
                    </GalleryDiv>
                </Layout>
            </section>
        ))

}