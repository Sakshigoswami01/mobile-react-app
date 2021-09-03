import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Container } from '@material-ui/core';
import { Facebook } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    subroot: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        flexFlow: 'column'
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        textDecoration: 'none',
        color: '#606060',
        marginTop: '6px',
        marginBottom: '6px'
    },
    CopyrightContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    Copyright: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        flexFlow: 'column'
    },
    CopyrightHeading: {
        margin: '10px'
    },
    CopyrightButtons: {
        margin: '8px'
    }
}));
export default function Footer() {
    const classes = useStyles();
    const FooterDetails =
        [
            {
                title: 'Company',
                category: ['About Us','Carrers','Support','Contact Us','Charity']
            },
            {
                title: 'Services',
                category: ['Samsung','IPhone','Realme','OnePlus','Sony']
            },
            {
                title: 'Explore',
                category: ['TV','Mobile','Tab',"Smart Watch's"]
            },
            {
                title: 'Customer Service',
                category: ['Terms & Condition','FAQ','Contact Us'],
            },
            {
                title: 'Social',
                category: ['Facebook','Youtube','LinkedIn','Instagram','Twitter'],
                
                href: ['https://www.facebook.com/','https://www.youtube.com/','https://in.linkedin.com/','https://www.instagram.com/','https://www.twitter.com/'],
            },
        ];
    return (
        <div className={classes.root}>
            <div className={classes.subroot}>
                <div className={classes.footer}>
                    <h2>{FooterDetails[0].title}</h2>
                    {FooterDetails[0].category.map((category) => (
                        <a href='#' target='blank' className={classes.button}>{category}</a>
                    ))}
                </div >
                <div className={classes.footer}>
                    <h2>{FooterDetails[1].title}</h2>
                    {FooterDetails[1].category.map((category) => (
                        <a href='#' target='blank' className={classes.button}>{category}</a>
                    ))}
                </div>
                <div className={classes.footer}>
                    <h2>{FooterDetails[2].title}</h2>
                    {FooterDetails[2].category.map((category) => (
                        <a href='#' target='blank' className={classes.button}>{category}</a>
                    ))}
                </div>
                <div className={classes.footer}>
                    <h2>{FooterDetails[3].title}</h2>
                    {FooterDetails[3].category.map((category, index) => (
                        <a href='#' target='blank' className={classes.button}>{category}</a>
                    ))}
                </div>
                <div className={classes.footer}>
                    <h2>{FooterDetails[4].title}</h2>

                    {FooterDetails[4].category.map((category,index) => (
                        <a href={FooterDetails[4].href[index]} target='blank' className={classes.button}>{category}</a>
                    ))}
                </div>
            </div>

            <div className={classes.CopyrightContainer}>
                <br />
                <Divider />
                <br />
                <div className={classes.Copyright}>
                    <div className={classes.CopyrightHeading}>
                        Copyright &#169; 2015-2020 All Rights Reserved.
                    </div>
                    <div className={classes.CopyrightButtons}>
                        <a href='#' target='blank' className={classes.button}>Privacy Policy</a>&nbsp;|&nbsp;
                        <a href='#' target='blank' className={classes.button}>Terms & Conditions</a>&nbsp;|&nbsp;
                        <a href='#' target='blank' className={classes.button}>Sitemap</a>
                    </div>
                </div>
            </div>
            <br />
            <br />
        </div>
    );
}
