import React, {Component} from 'react';
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from '../components/hoc/withAuth';

class Blogs extends Component {
    render() {
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage title="Blogs Page">
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(Blogs);