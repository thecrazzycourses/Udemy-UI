import React, {Component} from 'react';
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from '../components/hoc/withAuth';
import CreatePortfolio from "../components/shared/CreatePortfolio";
import {Col, Row} from "reactstrap";

class PortfolioNew extends Component {

    createPortfolio = (portfolioFormValues) => {
        alert(JSON.stringify(portfolioFormValues, null, 2));
    }

    render() {
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage className="portfolio-create-page" title="Create New Portfolio">
                    <Row>
                        <Col md={6}>
                            <CreatePortfolio onSubmit={this.createPortfolio}/>
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(PortfolioNew);