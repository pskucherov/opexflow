import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavItem, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';

import IntlMessages from '../../helpers/IntlMessages';
import ApplicationMenu from '../../components/common/ApplicationMenu';

import { getSurveyListWithFilter } from '../../redux/actions';

export class SurveyApplicationMenu extends Component {
    constructor(props) {
        super();
    }

    addFilter(column, value) {
        this.props.getSurveyListWithFilter(column, value);
    }

    render() {
        const {
            surveyItems,
            filter,
            allSurveyItems,
            loading,
            labels,
            categories,
        } = this.props.surveyListApp;

        return (
            <ApplicationMenu>
                <PerfectScrollbar
                    option={{ suppressScrollX: true, wheelPropagation: false }}
              >
                    <div className="p-4">
                        <p className="text-muted text-small">
                            <IntlMessages id="survey.status" />
                        Status
                        </p>
                        <ul className="list-unstyled mb-5">
                            <NavItem className={classnames({ active: !filter })}>
                                <NavLink to="#" onClick={e => this.addFilter('', '')}>
                                    <i className="simple-icon-reload" />
                                    <IntlMessages id="survey.all-surveys" />
                                    <span className="float-right">
                                        {loading && allSurveyItems.length}
                                  </span>
                              </NavLink>
                          </NavItem>
                            <NavItem
                                className={classnames({
                                    active:
                    filter &&
                    filter.column === 'status' &&
                    filter.value === 'ACTIVE',
                                })}
                          >
                                <NavLink
                                    to="#"
                                    onClick={e => this.addFilter('status', 'ACTIVE')}
                              >
                                    <i className="simple-icon-refresh" />
                                    <IntlMessages id="survey.active-surveys" />
                                    <span className="float-right">
                                        {loading &&
                      surveyItems.filter(x => x.status === 'ACTIVE').length}
                                  </span>
                              </NavLink>
                          </NavItem>
                            <NavItem
                                className={classnames({
                                    active:
                    filter &&
                    filter.column === 'status' &&
                    filter.value === 'COMPLETED',
                                })}
                          >
                                <NavLink
                                    to="#"
                                    onClick={e => this.addFilter('status', 'COMPLETED')}
                              >
                                    <i className="simple-icon-check" />
                                    <IntlMessages id="survey.completed-surveys" />
                                    <span className="float-right">
                                        {loading &&
                      surveyItems.filter(x => x.status === 'COMPLETED').length}
                                  </span>
                              </NavLink>
                          </NavItem>
                      </ul>
                        <p className="text-muted text-small">
                            <IntlMessages id="survey.categories" />
                      </p>
                        <ul className="list-unstyled mb-5">
                            {categories.map((c, index) => (
                            <NavItem key={index}>
                                  <div onClick={e => this.addFilter('category', c)}>
                                      <div className="custom-control custom-radio">
                                          <input
                                              type="radio"
                                              className="custom-control-input"
                                              defaultChecked={
                                                    filter &&
                            filter.column === 'category' &&
                            filter.value === c
                                                }
                                            />
                                          <label className="custom-control-label">{c}</label>
                                        </div>
                                    </div>
                                </NavItem>
                            ))}
                      </ul>
                        <p className="text-muted text-small">
                            <IntlMessages id="survey.labels" />
                      </p>
                        <div>
                            {labels.map((l, index) => (
                            <p className="d-sm-inline-block mb-1" key={index}>
                                  <NavLink
                                      to="#"
                                      onClick={e => this.addFilter('label', l.label)}
                                    >
                                      <Badge
                                          className="mb-1"
                                          color={`${
                          filter &&
                          filter.column === 'label' &&
                          filter.value === l.label ?
                              l.color :
                              `outline-${ l.color}`
                        }`}
                                          pill
                                        >
                                          {l.label}
                                        </Badge>
                                    </NavLink>
                                </p>
                            ))}
                      </div>
                  </div>
              </PerfectScrollbar>
          </ApplicationMenu>
        );
    }
}
const mapStateToProps = ({ surveyListApp }) => ({
    surveyListApp,
});
export default connect(
    mapStateToProps,
    {
        getSurveyListWithFilter,
    },
)(SurveyApplicationMenu);
