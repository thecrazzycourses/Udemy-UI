import React, {Component} from 'react';
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from '../components/hoc/withAuth';

class About extends Component {

    render() {
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className="about-page" title="About Page">
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(About);