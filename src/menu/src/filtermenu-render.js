/**
 * @ignore
 * filter menu render
 * 1.create filter input
 * 2.change menu content element
 * @author yiminghe@gmail.com
 */
KISSY.add("menu/filtermenu-render", function (S, Node, MenuRender) {
    var $ = Node.all,
        MENU_FILTER = "menu-filter",
        MENU_FILTER_LABEL = "menu-filter-label",
        MENU_CONTENT = "menu-content";

    return MenuRender.extend({
        getContentElement:function () {
            return this.get("menuContent");
        },

        getKeyEventTarget:function () {
            return this.get("filterInput");
        },
        createDom:function () {
            var self = this;
            var prefixCls=self.get('prefixCls');
            var el = self.get('el');
            var filterWrap = self.get("filterWrap");
            if (!filterWrap) {
                self.set("filterWrap",
                    filterWrap = $("<div class='" + prefixCls+MENU_FILTER + "'/>")
                        .appendTo(el, undefined));
            }
            if (!this.get("labelEl")) {
                this.set("labelEl",
                    $("<div class='" + prefixCls+MENU_FILTER_LABEL + "'/>")
                        .appendTo(filterWrap, undefined));
            }
            if (!self.get("filterInput")) {
                self.set("filterInput", $("<input "+"autocomplete='off'/>")
                    .appendTo(filterWrap, undefined));
            }
            if (!self.get("menuContent")) {
                self.set("menuContent",
                    $("<div class='" + prefixCls+MENU_CONTENT + "'/>")
                        .appendTo(el, undefined));
            }
        },
        '_onSetLabel':function (v) {
            this.get("labelEl").html(v);
        }
    }, {
        ATTRS:{
            label:{}
        },

        HTML_PARSER:{
            labelEl:function (el) {
                return el.one("." + this.get('prefixCls')+MENU_FILTER)
                    .one("." + this.get('prefixCls')+MENU_FILTER_LABEL)
            },
            'filterWrap':function (el) {
                return el.one("." + this.get('prefixCls')+MENU_FILTER);
            },
            menuContent:function (el) {
                return el.one("." + this.get('prefixCls')+MENU_CONTENT);
            },
            filterInput:function (el) {
                return el.one("." + this.get('prefixCls')+MENU_FILTER)
                    .one("input");
            }
        }
    });

}, {
    requires:['node', './menu-render']
});