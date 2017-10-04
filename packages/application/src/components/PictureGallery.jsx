import React from 'react';
import {Grid, Image, Divider, Segment, Header, Icon, Input, Button, Statistic} from 'semantic-ui-react'

const PictureGalleryContainer = () => {
    return (
        <div>
            <Grid padded columns='16'>
                <Grid.Row>
                    <Grid.Column mobile={11} tablet={13} computer={14}>
                        <Input fluid icon='search' placeholder='Search...'/>
                    </Grid.Column>
                    <Grid.Column mobile={5} tablet={3} computer={2}>
                        <Button>
                            Search
                        </Button>
                    </Grid.Column>
                </Grid.Row>
                <Statistic.Group>
                    <Statistic color='orange' label='orange' />
                    <Statistic color='yellow' label='yellow' />
                    <Statistic color='olive' label='olive' />
                    <Statistic color='green' label='green' />
                    <Statistic color='teal' label='teal' />
                    <Statistic color='blue' label='blue' />
                    <Statistic color='violet' label='violet' />
                    <Statistic color='purple' label='purple' />
                    <Statistic color='pink' label='pink' />
                    <Statistic color='brown' label='brown' />
                    <Statistic color='grey' label='grey' />
                </Statistic.Group>
            </Grid>
            <Grid verticalAlign='middle' padded columns='equal'>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Segment>
                        <Button circular color='green' size='big' icon='plus'/>
                    </Segment>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Image bordered
                           src='http://img.amur.info/crop/misc/2017-01-25/660x_/ccbc28832143a809a47967be2a184c32.jpg'/>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Image bordered src='http://www.zoovet.ru/images/cats_clich.jpg'/>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Image bordered
                           src='https://static.ngs.ru/news/preview/2f1065fb9401706e8d53cebcd6f33e5f1b2dd3fe_900.jpg'/>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Image bordered
                           src='http://murkote.com/wp-content/uploads/2013/03/skolko-stoit-kastratsiya-kota1.jpg'/>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Image bordered src='https://s13.stc.all.kpcdn.net/share/i/12/9656637/inx960x640.jpg'/>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Image bordered src='https://4tololo.ru/files/images/20170903140930.jpg'/>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Image bordered src='http://kot-pes.com/wp-content/uploads/2016/10/upld_1863.jpg'/>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Image
                        bordered
                        src='http://крысик.рф/wp-content/uploads/2012/08/%D0%BA%D0%B0%D1%81%D1%82%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B9-%D0%BA%D0%BE%D1%82.jpg'/>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Image bordered
                           src='http://img.amur.info/crop/misc/2017-01-25/660x_/ccbc28832143a809a47967be2a184c32.jpg'/>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Image bordered
                           src='http://img.amur.info/crop/misc/2017-01-25/660x_/ccbc28832143a809a47967be2a184c32.jpg'/>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Image bordered
                           src='http://img.amur.info/crop/misc/2017-01-25/660x_/ccbc28832143a809a47967be2a184c32.jpg'/>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Image bordered
                           src='http://img.amur.info/crop/misc/2017-01-25/660x_/ccbc28832143a809a47967be2a184c32.jpg'/>
                </Grid.Column>
            </Grid>
            <Button fluid loading>More</Button>
            <Divider hidden/>
        </div>

    )
};

export default PictureGalleryContainer;


