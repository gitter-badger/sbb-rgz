import React from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"

export const AktivitaetenListe: React.FunctionComponent = _ => {
    const activities = useStaticQuery(graphql`
    query ActivitiesListIndexQuery ($currentDate: Date!) {
        activities: allMdx(
            sort: { order: ASC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "aktivitaet-post" }, date: { gte: $currentDate } } }
            limit: 3
        ) {
            edges {
                node {
                    excerpt(pruneLength: 200)
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        templateKey
                        date(formatString: "dddd, DD.MM.YYYY", locale: "de")
                    }
                }
            }
        }
    }    
  `)

    return (<div className="columns">
        <div className="column is-10 is-offset-1">
            <div className="content">
                <h2>
                    Aktivitäten </h2>
                <div className="tile is-ancestor" style={{ flexWrap: 'wrap' }}>{activities &&
                    activities.map(({ node: activity }: { node: any }) => (
                        <div className="tile  is-parent" key={activity.id}>
                            <div className="tile is-child">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="media">
                                            <div className="media-content">
                                                <p className="title is-4"><Link
                                                    to={activity.fields.slug}
                                                >{activity.frontmatter.title}</Link></p>
                                                <p className="subtitle is-6">{activity.frontmatter.date}</p>
                                            </div>
                                        </div>
                                        <div className="content">
                                            {activity.excerpt}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}</div>
            </div>
        </div>
    </div>)
}