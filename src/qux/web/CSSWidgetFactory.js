import Logger from '../core/Logger'
import * as Util from '../core/ExportUtil'

export default class CSSWidgetFactory {

  constructor(cssFactory) {
    Logger.log(1, 'CSSWidgetFactory.constructor()')
    this.cssFactory = cssFactory
  }

  getCSS_Repeater(selector, style, widget) {
    Logger.log(0, 'getCSS_Repeater', widget)
    let result = ''
    result += selector + ' {\n'
    result += this.cssFactory.getRawStyle(style, widget);
    result += this.cssFactory.getPosition(widget, screen);
    result += '}\n\n'

    if (Util.isRepeaterGrid(widget)) {
      Logger.log(5, 'getCSS_Repeater () > grid', widget)
      result += selector + ' .qux-repeater-child {\n'
      result += '  display: inline-block;\n';
      let width = 100 / widget.props.columns
      result += `  width: calc(${width}% - ${widget.props.distanceX}px);\n`;
      result += `  margin-bottom:${widget.props.distanceY}px;\n`;
      result += `  align-self: stretch;\n`;
      result += '}\n\n'
    } else if (Util.isRepeaterWrap(widget)) {
      Logger.log(0, 'getCSS_Repeater () > wrap', widget)
      result += selector + ' .qux-repeater-child {\n'
      result += '  display: inline-block;\n';
      let width = this.getChildWidth(widget)
      result += `  width: ${width};\n`;
      result += `  margin-bottom:${widget.props.distanceY}px;\n`;
      result += '}\n\n'
    } else {
      result += selector + ' .qux-repeater-child {\n'
      result += `  margin-bottom:${widget.props.distanceY}px;\n`;
      result += '}\n\n'
    }

    return result
  }

  getCSS_Icon(selector, style, widget) {
    let result = ''
    result += selector + ' {\n'
    result += this.cssFactory.getRawStyle(style, widget);
    result += `  font-size:${widget.h}px;\n`
    result += this.cssFactory.getPosition(widget, screen);
    result += '}\n\n'
    return result
  }

  getCSS_RadioGroup(selector, style, widget) {
    let result = ''

    let correctedHeight = this.cssFactory.getCorrectedHeight(widget, false, widget.style.boxHeight)
    let height = widget.style.boxHeight + 'px'

    result += selector + ' {\n'
    result += this.cssFactory.getPosition(widget, screen);
    result += '}\n\n'

    result += selector + '.qux-radiobox {\n'
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.borderProperties)
    result += this.cssFactory.getBackGround(style, widget)

    result += `  height:${height};\n`
    result += `  width:${height};\n`
    result += '}\n\n'


    result += selector + ' .qux-radiobox-cntr {\n'
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.borderProperties)
    result += this.cssFactory.getBackGround(style, widget)
    result += `  height:${correctedHeight};\n`
    result += `  width:${correctedHeight};\n`
    result += '}\n\n'


    result += selector + ' .qux-radiobox-hook {\n'
    result += `  background: ${style.colorButton};\n`
    result += '}\n\n'

    result += selector + ' .qux-radiobox-label {\n'
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.fontProperties)
    result += '}\n\n'

    if (widget.checked) {
      result += selector + '.qux-radiobox-checked .qux-radiobox-cntr {\n'
      result += this.cssFactory.getStyleByKey(widget.checked, widget, this.cssFactory.borderColorProperties)
      result += '}\n\n'
    }


    return result
  }


  getCSS_CheckBoxGroup(selector, style, widget) {
    let result = ''

    let correctedHeight = this.cssFactory.getCorrectedHeight(widget, false, widget.style.boxHeight)
    let height = widget.style.boxHeight + 'px'

    result += selector + ' {\n'
    result += this.cssFactory.getPosition(widget, screen);
    result += '}\n\n'

    result += selector + '.qux-checkbox {\n'
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.borderProperties)
    result += this.cssFactory.getBackGround(style, widget)

    result += `  height:${height};\n`
    result += `  width:${height};\n`
    result += '}\n\n'


    result += selector + ' .qux-checkbox-cntr {\n'
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.borderProperties)
    result += this.cssFactory.getBackGround(style, widget)
    result += `  height:${correctedHeight};\n`
    result += `  width:${correctedHeight};\n`
    result += '}\n\n'


    result += selector + ' .qux-checkbox-hook {\n'
    result += `  border-color: ${style.colorButton};\n`
    result += '}\n\n'

    result += selector + ' .qux-checkbox-label {\n'
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.fontProperties)
    result += '}\n\n'

    if (widget.checked) {
      result += selector + '.qux-checkbox-checked .qux-checkbox-cntr {\n'
      result += this.cssFactory.getStyleByKey(widget.checked, widget, this.cssFactory.borderColorProperties)
      result += '}\n\n'
    }


    return result
  }


  getCSS_RadioBox2(selector, style, widget) {
    let result = ''

    result += selector + ' {\n'
    result += this.cssFactory.getPosition(widget, screen);
    result += '}\n\n'

    result += selector + ' .qux-radiobox-cntr {\n'
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.borderProperties)
    result += this.cssFactory.getBackGround(style, widget)
    result += `  height:${this.cssFactory.getCorrectedHeight(widget)};\n`
    result += `  width:${this.cssFactory.getCorrectedWidth(widget)};\n`
    result += '}\n\n'


    result += selector + ' .qux-radiobox-hook {\n'
    result += `  background: ${style.colorButton};\n`
    result += '}\n\n'

    if (widget.checked) {
      result += selector + '.qux-radiobox-checked .qux-radiobox-cntr {\n'
      result += this.cssFactory.getStyleByKey(widget.checked, widget, this.cssFactory.borderColorProperties)
      result += '}\n\n'
    }

    return result
  }

  getCSS_CheckBox(selector, style, widget) {
    let result = ''
    result += selector + ' {\n'
    result += this.cssFactory.getPosition(widget, screen);

    result += '}\n\n'

    result += selector + ' .qux-checkbox-cntr {\n'
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.borderProperties)
    result += this.cssFactory.getBackGround(style, widget)
    result += `  height:${this.cssFactory.getCorrectedHeight(widget)};\n`
    result += `  width:${this.cssFactory.getCorrectedWidth(widget)};\n`
    result += '}\n\n'


    result += selector + ' .qux-checkbox-hook {\n'
    result += `  border-color: ${style.colorButton};\n`
    result += '}\n\n'

    if (widget.checked) {
      result += selector + '.qux-checkbox-checked .qux-checkbox-cntr {\n'
      result += this.cssFactory.getStyleByKey(widget.checked, widget, this.cssFactory.borderColorProperties)
      result += '}\n\n'
    }

    return result
  }


  getCSS_Switch(selector, style, widget) {
    let result = ''

    result += selector + ' {\n'
    result += this.cssFactory.getPosition(widget, screen);
    result += '}\n\n'

    let cntrHeight = this.cssFactory.getCorrectedHeight(widget, false, widget.h)
    let cntrWidth = this.cssFactory.getCorrectedWidth(widget, false, widget.w)
    if (style.cssClass === 'MatcWidgetTypeSwitchThin') {
      cntrHeight = '50%';
    }

    result += selector + ' .qux-switch-cntr {\n'
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.borderProperties)
    result += `  height:${cntrHeight};\n`
    result += `  width:${cntrWidth};\n`
    result += '}\n\n'

    result += selector + ' .qux-switch-handle {\n'
    result += `  background:${style.colorButton};\n`
    result += `  border-radius:${style.borderRadius};\n`
    result += this.cssFactory.getStyleByKey(style, widget, ['boxShadow'])
    result += `  height: ${widget.h}px;\n`
    result += `  width: ${widget.h}px;\n`
    result += '}\n\n'


    result += selector + '.qux-active .qux-switch-handle {\n'
    result += `  left:calc(100% - ${widget.h}px);\n`
    result += '}\n\n'

    result += selector + ' .qux-switch-on {\n'
    result += `  background:${style.background};\n`
    result += '}\n\n'

    result += selector + ' .qux-switch-off {\n'
    result += `  background:${style.colorForeGround};\n`
    result += '}\n\n'

    return result
  }

  getCSS_MobileDropDown(selector, style, widget) {
    let result = ''

    result += selector + ' {\n'
    result += this.cssFactory.getRawStyle(style, widget);
    result += this.cssFactory.getPosition(widget, screen);
    result += '}\n\n'

    result += this._addCaret(selector, widget, style)

    result += selector + ' .qux-dropdown-popup {\n'
    result += `  background:${style.popupBackground};\n`
    result += `  color:${style.popupColor};\n`
    result += '}\n\n'

    if (widget.focus) {
      result += selector + ':hover {\n'
      result += this.cssFactory.getRawStyle(widget.focus, widget);
      result += '}\n\n'
      result += this._addCaret(selector + ':hover', widget, widget.focus)

      result += selector + ':hover .qux-dropdown-popup {\n'
      result += this.cssFactory.getStyleByKey(widget.focus, widget, this.cssFactory.borderProperties)
      result += '}\n\n'
    }

    return result
  }

  getCSS_DropDown(selector, style, widget) {

    let result = ''

    result += selector + ' {\n'
    result += this.cssFactory.getRawStyle(style, widget);
    result += this.cssFactory.getPosition(widget, screen);
    result += '}\n\n'

    result += this._addCaret(selector, widget, style)

    // make sure we have always some focus
    result += selector + '.qux-open {\n'
    result += `  z-index: 1000;\n`
    result += '}\n\n'

    result += selector + ':not(.qux-dropdown-mobile) .qux-dropdown-popup {\n'
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.borderProperties)
    result += '}\n\n'

    result += selector + ':not(.qux-dropdown-mobile) .qux-dropdown-item {\n'
    result += `  background:${style.popupBackground};\n`
    result += `  color:${style.popupColor};\n`
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.paddingProperties)
    result += '}\n\n'


    result += selector + ':not(.qux-dropdown-mobile) .qux-dropdown-item:hover {\n'
    result += `  background:${style.selectedOptionBackground};\n`
    result += `  color:${style.selectedOptionColor};\n`
    result += '}\n\n'

    if (widget.focus) {
      result += selector + ':hover {\n'
      result += this.cssFactory.getRawStyle(widget.focus, widget);
      result += '}\n\n'
      result += this._addCaret(selector + ':hover', widget, widget.focus)

      result += selector + ':hover .qux-dropdown-popup {\n'
      result += this.cssFactory.getStyleByKey(widget.focus, widget, this.cssFactory.borderProperties)
      result += '}\n\n'
    }

    return result
  }

  _addCaret(selector, widget, style) {
    let result = ''
    if (widget.props && widget.props.caretBorderColor) {
      result += selector + ' .qux-dropdown-expend {\n'
      result += `  background:${style._borderRightColor};\n`
      result += '}\n\n'

      result += selector + ' .qux-dropdown-carret {\n'
      result += `  color:${style.background};\n`
      result += '}\n\n'
    }

    return result
  }

  getCSS_Stepper(selector, style, widget) {

    let result = ''

    result += selector + ' {\n'
    result += this.cssFactory.getRawStyle(style, widget);
    result += this.cssFactory.getPosition(widget, screen);
    result += '}\n\n'

    if (widget.hover) {
      result += selector + ' .qux-stepper-btn:hover {\n'
      result += `  background:${widget.hover.background};\n`
      result += `  color:${widget.hover.color};\n`
      result += '}\n\n'
    }

    return result
  }

  getCSS_HSlider(selector, style, widget) {
    let result = ''

    result += selector + ' {\n'
    result += this.cssFactory.getPosition(widget, screen);
    result += '}\n\n'

    result += selector + ' .qux-slider-track {\n'
    result += `  background:${style.background};\n`
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.borderProperties)
    result += '}\n\n'

    result += selector + ' .qux-slider-progress {\n'
    result += `  background:${style.barColor};\n`
    result += '}\n\n'

    result += selector + ' .qux-slider-handle  {\n'
    result += `  background:${style.handleColor};\n`
    result += `  border-radius:${style.handleRadius}%;\n`
    result += `  height:${style.handleHeight * widget.h}px;\n`
    result += `  width:${style.handleWidth }px;\n`
    result += '}\n\n'

    result += selector + ' .qux-slider-handle-cntr  {\n'
    result += `  margin-left: ${style.handleWidth / 2}px;\n`
    result += `  width: calc(100% - ${style.handleWidth}px);\n`
    result += '}\n\n'

    return result
  }


  getCSS_Date(selector, style, widget, isInPopup = false) {
    let result = ''

    if (!isInPopup) {
      result += selector + ' {\n'
      result += this.cssFactory.getRawStyle(style, widget);
      result += this.cssFactory.getPosition(widget, screen);
      result += '}\n\n'
    }

    if (style.tableBorderWidth) {
      result += selector + ' table {\n'
      result += `  border-spacing:${style.tableBorderWidth}px;\n`
      result += `  border-collapse: separate;\n`
      result += '}\n\n'
    }

    result += selector + ' .qux-date-week-days {\n'
    result += `  background:${style.tableHeaderBackground};\n`
    result += `  color:${style.tableHeaderColor};\n`
    result += '}\n\n'

    result += selector + ' .qux-date-header {\n'
    result += `  background:${style.headerBackground};\n`
    result += `  color:${style.headerColor};\n`
    result += '}\n\n'

    if (style.weekendBackground && style.weekendColor) {
      result += selector + ' .qux-date-weekend {\n'
      result += `  background:${style.weekendBackground};\n`
      result += `  color:${style.weekendColor};\n`
      result += '}\n\n'
    }

    if (style.weekdayBackground && style.weekdayColor) {
      result += selector + ' .qux-date-workday {\n'
      result += `  background:${style.weekdayBackground};\n`
      result += `  color:${style.weekdayColor};\n`
      result += '}\n\n'
    }

    if (widget.props.range) {

      result += selector + ' .qux-date-range-start {\n'
      result += `  background:${style.selectedBackground};\n`
      result += `  color:${style.selectedColor};\n`
      if (style.itemBorderRadius) {
        result += `  border-radius:${style.itemBorderRadius}%;\n`
      }
      result += '}\n\n'

      result += selector + ' .qux-date-range-end {\n'
      result += `  background:${style.selectedBackground};\n`
      result += `  color:${style.selectedColor};\n`
      if (style.itemBorderRadius) {
        result += `  border-radius:${style.itemBorderRadius}%;\n`
      }
      result += '}\n\n'

      result += selector + ' .qux-date-range-middle {\n'
      result += `  background:${style.selectedInRangeBackground};\n`
      result += `  color:${style.selectedInRangeColor};\n`
      if (style.itemBorderRadius) {
        result += `  border-radius:${style.itemBorderRadius}%;\n`
      }
      result += '}\n\n'

    } else {
      result += selector + ' .qux-date-selected {\n'
      result += `  background:${style.selectedBackground};\n`
      result += `  color:${style.selectedColor};\n`
      if (style.itemBorderRadius) {
        result += `  border-radius:${style.itemBorderRadius}%;\n`
      }
      result += '}\n\n'
    }


    return result
  }

  getCSS_DateDropDown(selector, style, widget) {
    let result = ''

    result += selector + ' {\n'
    result += this.cssFactory.getRawStyle(style, widget);
    result += this.cssFactory.getPosition(widget, screen);
    result += '}\n\n'

    result += this._addCaret(selector, widget, style)

    result += selector + ' .qux-date-picker-popup {\n'
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.borderProperties)
    result += `  width:${style.fontSize * 18}px;\n`
    result += `  height:${style.fontSize * 18}px;\n`
    result += '}\n\n'

    result += this.getCSS_Date(selector + " .qux-date-picker-popup", style, widget, true)

    return result
  }


  getCSS_SegmentButton(selector, style, widget) {
    let result = ''

    result += selector + ' {\n'
    result += this.cssFactory.getPosition(widget, screen);
    result += '}\n\n'

    result += selector + ' .qux-segment-item {\n'
    result += this.cssFactory.getRawStyle(style, widget);
    result += `  border-left: none;\n`
    result += `  border-radius: 0px;\n`
    result += '}\n\n'


    result += selector + ' .qux-segment-item:first-child {\n'
    result += `  border-left-color: ${style._borderLeftColor};\n`
    let borderLeftStyle = style._borderLeftStyle ? style._borderLeftStyle : 'solid'
    result += `  border-left-style: ${borderLeftStyle};\n`
    result += `  border-left-width: ${style._borderLeftWidth}px;\n`
    if (style._borderTopLeftRadius) {
      result += `  border-top-left-radius: ${style._borderTopLeftRadius}px;\n`
    }
    if (style._borderBottomLeftRadius) {
      result += `  border-bottom-left-radius: ${style._borderBottomLeftRadius}px;\n`
    }
    result += '}\n\n'


    result += selector + ' .qux-segment-item:last-child {\n'
    if (style._borderTopRightRadius) {
      result += `  border-top-right-radius: ${style._borderTopRightRadius}px;\n`
    }
    if (style._borderBottomRightRadius) {
      result += `  border-bottom-right-radius: ${style._borderBottomRightRadius}px;\n`
    }
    result += '}\n\n'


    if (widget.active) {
      let active = widget.active
      result += selector + ' .qux-segment-item.qux-segment-item-selected{\n'
      result += `  background:${active.background};\n`
      result += `  color:${active.color};\n`
      result += this.cssFactory.getStyleByKey(active, widget, this.cssFactory.borderColorProperties)
      result += '}\n\n'
    }

    return result
  }

  getCSS_Rating(selector, style, widget) {
    let result = ''

    result += selector + ' {\n'
    result += this.cssFactory.getPosition(widget, screen);
    result += `  color:${style.color};\n`
    result += `  font-size:${widget.h}px;\n`
    result += '}\n\n'

    return result
  }

  getCSS_LabeledIconToggle(selector, style, widget) {
    return this.getCSS_IconToggle(selector, style, widget)
  }

  getCSS_IconToggle(selector, style, widget) {
    let result = ''

    result += selector + ' {\n'
    result += this.cssFactory.getPosition(widget, screen);
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.textProperties)
    result += `  color:${style.passiveColor};\n`
    result += `  font-size:${style.fontSize}px;\n`
    result += '}\n\n'

    result += selector + '.qux-icon-toggle-selected {\n'
    result += `  color:${style.activeColor};\n`
    result += '}\n\n'

    result += selector + ' .qux-icon {\n'
    result += `  font-size:${widget.h}px;\n`
    result += '}\n\n'

    return result
  }


  getCSS_TypeAheadTextBox(selector, style, widget) {

    let result = ''

    result += selector + ' {\n'
    result += this.cssFactory.getPosition(widget, screen);
    result += '}\n\n'

    result += selector + ' .qux-combo-input {\n'
    result += this.cssFactory.getRawStyle(style, widget);
    let paddingH = style._paddingLeft + style._paddingRight;
    let paddingV = style._paddingTop + style._paddingBottom;
    result += `  width:calc(100% - ${paddingH}px);\n`
    result += `  height:calc(100% - ${paddingV}px);\n`
    result += '}\n\n'


    // make sure we have always some focus
    result += selector + '.qux-open {\n'
    result += `  z-index: 1000;\n`
    result += '}\n\n'

    result += selector + ' .qux-combo-popup {\n'
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.borderProperties)
    result += '}\n\n'


    result += selector + ' .qux-combo-item {\n'
    result += `  background:${style.background};\n`
    result += `  color:${style.color};\n`
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.paddingProperties)
    result += '}\n\n'


    result += selector + ' .qux-combo-item:hover,\n'
    result += selector + ' .qux-combo-item-selected {\n'
    result += `  background:${style.selectedOptionBackground};\n`
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.paddingProperties)
    result += `  color:${style.selectedOptionColor};\n`
    result += '}\n\n'

    // FIXME: make here a default style for mobile?


    if (widget.focus) {
      result += selector + ':hover {\n'
      result += this.cssFactory.getRawStyle(widget.focus, widget);
      result += '}\n\n'
      result += this._addCaret(selector + ':hover', widget, widget.focus)

      //result += selector + ':hover .qux-combo-popup {\n'
      //result += this.cssFactory.getStyleByKey(widget.focus, widget, this.cssFactory.borderProperties)
      //result += '}\n\n'
    }

    return result
  }

  getCSS_Table(selector, style, widget) {


    let result = ''
    let borderStyle = this.getTableBorderStyle(widget) 

    result += selector + ' {\n'
    result += this.cssFactory.getPosition(widget, screen);
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.textProperties)

    if (borderStyle === 'Out') {
      result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.borderProperties)
    }
    result += '}\n\n'

    result += selector + ' .qux-table-action,'
    result += selector + ' .qux-table-cell{\n'
    result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.paddingProperties)
    result += '}\n\n'


    if (borderStyle === 'Cell') {
      result += selector + ' th,'
      result += selector + ' td{\n'
      result += this.cssFactory.getStyleByKey(style, widget, this.cssFactory.borderProperties)
      result += '}\n\n'
    }

    if (borderStyle === 'VLines') {
      result += selector + ' th,'
      result += selector + ' td{\n'
      result += `  border-right-color:${style._borderBottomColor};\n`
      result += `  border-right-width:${style._borderBottomWidth}px;\n`
      result += `  border-right-style:solid;\n`
      result += '}\n\n'

      result += selector + ' th:last-child,'
      result += selector + ' td:last-Child{\n'
      result += `  border:none;\n`
      result += '}\n\n'
    }

    if (borderStyle === 'HLines') {
      result += selector + ' th,'
      result += selector + ' td{\n'
      result += `  border-bottom-color:${style._borderBottomColor};\n`
      result += `  border-bottom-width:${style._borderBottomWidth}px;\n`
      result += `  border-bottom-style:solid;\n`
      result += '}\n\n'

      result += selector + ' tr:last-child th,'
      result += selector + ' tr:last-Child td{\n'
      result += `  border:none;\n`
      result += '}\n\n'
    }

    result += selector + ' thead tr{\n'
    result += `  background:${style.headerBackground};\n`
    result += `  color:${style.headerColor};\n`
    if (style.headerFontStyle) {
      result += `  font-style:${style.headerFontStyle};\n`
    }
    if (style.headerFontWeight) {
      result += `  font-weight:${style.headerFontWeight};\n`
    }
    if (style.headerTextDecoration) {
      result += `  text-decoration:${style.headerTextDecoration};\n`
    }
    result += '}\n\n'

    result += selector + ' tbody tr:nth-child(2){\n'
    result += `  background:${style.evenRowBackground};\n`
    result += `  color:${style.evenRowColor};\n`
    result += '}\n\n'

    result += selector + ' tbody tr:hover{\n'
    if (style.hoverBackground) {
      result += `  background:${style.hoverBackground};\n`
    }
    if (style.hoverColor) {
      result += `  color:${style.hoverColor};\n`
    }
    result += '}\n\n'

    if (widget.props.tableActions) {
      widget.props.tableActions.forEach((action, i) => {
        result += selector + ' .qux-table-action-cntr .qux-table-action-' + i + '{\n'
        if (action.color) {
          result += `  color:${action.color};\n`
        }
        result += '}\n\n'
      })
    }

    if (style.checkBox) {
      result += selector + ' .qux-checkbox-cntr{\n'
      let s = style.checkBoxSize ? style.checkBoxSize : style.fontSize
      result += `  width:${s}px;\n`
      result += `  height:${s}px;\n`
      result += `  background:${style.checkBoxBackground};\n`
      result += `  border-color:${style.checkBoxBorderColor};\n`
      result += `  border-radius:${style.checkBoxBorderRadius}px;\n`
      result += `  border-width:${style.borderWidth}px;\n`

      result += '}\n\n'

      result += selector + ' .qux-checkbox-hook {\n'
      result += `  border-color:${style.checkBoxHookColor};\n`
      result += '}\n\n'
    }

    let widths = this.getTableWidths(widget.props, style)
    widths.forEach((w,i) => {
      result += selector + ' .qux-table-column-' + i + '{\n'
      result += `  width:${Math.round(w * widget.w)}px;\n`
      result += '}\n\n'
    })
    //widths.forEach((w,i) => {
    //  result += selector + ' td:nth-child(' + (i +1 ) + '){\n'
    //  result += `  width:${Math.round(w * widget.w)}px;\n`
    //  result += '}\n\n'
    //})
    return result
  }

  getTableWidths (props,style, fontFactor = 0.6) {
    var result = [];
    if (props.widths) {
      let widths = props.widths
  
      var sum = 0;
      let padding = style._paddingLeft + style._paddingRight
      if (style.checkBox) {
        let w = style.checkBoxSize ? style.checkBoxSize : style.fontSize 
        widths = [w + padding].concat(widths);
      }
      if (props.tableActions && props.tableActions.length > 0) {
        let text = props.tableActions.map(a => a.label).join()
        let w = text.length * style.fontSize * fontFactor + padding * props.tableActions.length
        widths = widths.concat(w)
      }
      for (let i = 0; i < widths.length; i++) {
        sum += widths[i];
      } 
      for (let i = 0; i < widths.length; i++) {
        result[i] = widths[i] / sum;
      }
    }
    return result;
  }


  getTableBorderStyle (model) {
    if (model.props.borderStyle) {
      return model.props.borderStyle;
    }
    return "Cell";
  }
}