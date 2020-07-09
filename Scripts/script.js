/*!

* @Version: v3.1.7
* Version: v3.1.7

*/

/*
 * jQuery v1.9.1 included
 */

$(document).ready(function() {
    // social share popups
    $(".share a").click(function(e) {
        e.preventDefault();
        window.open(this.href, "", "height = 500, width = 500");
    });

    // show form controls when the textarea receives focus or backbutton is used and value exists
    var $commentContainerTextarea = $(".comment-container textarea"),
        $commentContainerFormControls = $(".comment-form-controls, .comment-ccs");

    $commentContainerTextarea.one("focus", function() {
        $commentContainerFormControls.show();
    });

    if ($commentContainerTextarea.val() !== "") {
        $commentContainerFormControls.show();
    }

    // Expand Request comment form when Add to conversation is clicked
    var $showRequestCommentContainerTrigger = $(
            ".request-container .comment-container .comment-show-container"
        ),
        $requestCommentFields = $(
            ".request-container .comment-container .comment-fields"
        ),
        $requestCommentSubmit = $(
            ".request-container .comment-container .request-submit-comment"
        );

    $showRequestCommentContainerTrigger.on("click", function() {
        $showRequestCommentContainerTrigger.hide();
        $requestCommentFields.show();
        $requestCommentSubmit.show();
        $commentContainerTextarea.focus();
    });

    // Mark as solved button
    var $requestMarkAsSolvedButton = $(
            ".request-container .mark-as-solved:not([data-disabled])"
        ),
        $requestMarkAsSolvedCheckbox = $(
            ".request-container .comment-container input[type=checkbox]"
        ),
        $requestCommentSubmitButton = $(
            ".request-container .comment-container input[type=submit]"
        );

    $requestMarkAsSolvedButton.on("click", function() {
        $requestMarkAsSolvedCheckbox.attr("checked", true);
        $requestCommentSubmitButton.prop("disabled", true);
        $(this)
            .attr("data-disabled", true)
            .closest("form")
            .submit();
    });

    // Change Mark as solved text according to whether comment is filled
    var $requestCommentTextarea = $(
        ".request-container .comment-container textarea"
    );

    $requestCommentTextarea.on("keyup", function() {
        if ($requestCommentTextarea.val() !== "") {
            $requestMarkAsSolvedButton.text(
                $requestMarkAsSolvedButton.data("solve-and-submit-translation")
            );
            $requestCommentSubmitButton.prop("disabled", false);
        } else {
            $requestMarkAsSolvedButton.text(
                $requestMarkAsSolvedButton.data("solve-translation")
            );
            $requestCommentSubmitButton.prop("disabled", true);
        }
    });

    // Disable submit button if textarea is empty
    if ($requestCommentTextarea.val() === "") {
        $requestCommentSubmitButton.prop("disabled", true);
    }

    // Submit requests filter form in the request list page
    $("#request-status-select, #request-organization-select").on(
        "change",
        function() {
            search();
        }
    );

    // Submit requests filter form in the request list page
    $("#quick-search").on("keypress", function(e) {
        if (e.which === 13) {
            search();
        }
    });

    //load owl carousel
    $(".owl-carousel").owlCarousel({
        loop: false,
        rtl: false,
        margin: 10,
        nav: true,
        items: 2,
        responsive: {
            0: {
                items: 1
            },
            580: {
                items: 2
            },
            768: {
                items: 3
            }
        }
    });

    function search() {
        window.location.search = $.param({
            query: $("#quick-search").val(),
            status: $("#request-status-select").val(),
            organization_id: $("#request-organization-select").val()
        });
    }

    $(".header .icon-menu").on("click", function(e) {
        e.stopPropagation();
        var menu = document.getElementById("user-nav");
        var isExpanded = menu.getAttribute("aria-expanded") === "true";
        menu.setAttribute("aria-expanded", !isExpanded);
    });

    if ($("#user-nav").children().length === 0) {
        $(".header .icon-menu").hide();
    }

    // If multibrand search has more than 5 help centers or categories collapse the list
    const multibrandFilterLists = document.querySelectorAll(".multibrand-filter-list");
    Array.prototype.forEach.call(multibrandFilterLists, function(filter) {
        if (filter.children.length > 6) {
            // Display the show more button
            var trigger = filter.querySelector(".see-all-filters");
            trigger.setAttribute("aria-hidden", false);

            // Add event handler for click
            trigger.addEventListener("click", function(e) {
                e.stopPropagation();
                trigger.parentNode.removeChild(trigger);
                filter.classList.remove("multibrand-filter-list--collapsed")
            })
        }
    });

    // Submit organization form in the request page
    $("#request-organization select").on("change", function() {
        this.form.submit();
    });


    var homeBlock = $('.blocks-list').children().length;
    if (homeBlock) {
        $('.blocks').removeClass('hide');
    }

    // Toggles expanded aria to collapsible elements
    $(".collapsible-nav, .collapsible-sidebar").on("click", function(e) {
        e.stopPropagation();
        var isExpanded = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", !isExpanded);
    });

    var block = $(".article-more-questions > a").length;
    if (block) {
        $(".article-more-questions").css({ "padding": "20px 10px" });
    } else {
        $(".article-more-questions").css({ "padding": "0 10px" });
    }

    // Toggle promoted articles on homepage
    $(".knowledge-base .promoted-articles-item > a").click(function(e) {
        e.preventDefault();
        $(this).toggleClass("active");
        $(this)
            .next()
            .slideToggle(250);
    });

    // Make tables in article content responsive
    $(".article-body")
        .find("table")
        .wrap('<div class="table-responsive"></div>');


    // Adds Table of Content to Article if it finds <!--TOC--> in article source
    // Depends on toc plugin
    $("#toc").toc({ content: ".article-body" });
    var tocLength = $("#toc").children().length;
    if (tocLength) {
        $('#article-toc').show();
    }

    // Credits: https://codepen.io/chriscoyier/pen/dpBMVP
    // Select all links with hashes
    $('#toc a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
        // On-page links
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 60
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
    // Script to check the size of search sidebar children

    if ($(".search-results-sidebar").children().length < 1) {
        $(".search-results-sidebar").addClass("hide");
    }

    // If there are any error notifications below an input field, focus that field
    const notificationElm = document.querySelector(".notification-error");
    if (
        notificationElm &&
        notificationElm.previousElementSibling &&
        typeof notificationElm.previousElementSibling.focus === "function"
    ) {
        notificationElm.previousElementSibling.focus();
    }

     // Script to check the length of section article sidebar children
    if ($(".section-articles.collapsible-sidebar > ul").children().length < 1) {
        $(".article-sidebar").addClass("hide");
     }


});