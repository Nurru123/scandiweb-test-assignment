import React from "react";
import "./CartCarousel.css";
import { ReactComponent as CartVector } from "../../pics/cart-vector.svg";
import styled from "styled-components";

export const SlideImage = styled.img`
  max-width: 200px;
  max-height: 288px;
`;

export const StyledSlider = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 288px;
  width: 200px;
`;

export default class CartCarousel extends React.Component {

    state = {
        current: 0
    }

    nextSlide = () => {
        const { current } = this.state;
        const newCurrent = current === this.props.gallery.length - 1 ? 0 : current + 1;
        this.setState({ current: newCurrent });
    }

    prevSlide = () => {
        const { current } = this.state;
        const newCurrent = current === 0 ? this.props.gallery.length - 1 : current - 1;
        this.setState({ current: newCurrent });
    }

    render() {

        return (
            <StyledSlider>
                {this.props.gallery.length > 1 ?
                    <div className="slider-arrows">
                        <div className="left-arrow arrow-box" onClick={this.prevSlide}>
                            <CartVector />
                        </div>
                        <div className="right-arrow arrow-box" onClick={this.nextSlide}>
                            <CartVector />
                        </div>
                    </div> :
                    null}
                {this.props.gallery.map((slide, index) => {
                    return (
                        <div key={index}>
                            {index === this.state.current && <SlideImage src={slide} alt="" />}
                        </div>
                    )
                })}
            </StyledSlider>
        );
    };
};