var opening_from_load = null;

function open_comment() {

    var comment_form = $('#comment_form_main');
    
    p = $(this).parent().next();

     // Do we already have a form here?
     if (p.find('.comment_form').length == 0) {

         // Copy the comment form and insert it here        
         var this_comment_form = comment_form.clone();
         var this_id = p.attr('id');
         var this_comment_id = this_id.replace('comments_for_', '');
         var form_el = this_comment_form.find('form');

         form_el.attr('action', form_el.attr('action').replace('#', '#' + this_comment_id));
         
         this_comment_form.attr('id', 'comment_for_' + this_comment_id);
         this_comment_form.find(':hidden[name="xml_id"]').attr('value', this_comment_id);
         p.append(this_comment_form);
         this_comment_form.show();
     }
     // Show the other comments
     p.css('display','block');
     return true;
}

function close_comment(t) {
    var p = $(this).parent().next();
    p.hide();
    return false;
}

jQuery(document).ready(function() {


  /* The "make comment" link is primarily used for when "Show all comments" has been clicked
     but we didn't want to show a zillion comment forms, just comments. */
  $('.make_comment').click(function() {
          if ($(this).parent().parent().find('form').length == 0) {
              // Don't execute the click if we already have a comment form displaying
              $(this).parent().parent().prev().click();
          }
          return false; // Don't jump to the anchor point
  });

  $('a.comment_count').toggle(open_comment, close_comment);

  $('.ofps-show-hide-all-comments-toggle').toggle(
      /* On state */
      function() {
          // Only toggle openers that have comments; otherwise we see the "add a comment" link
          $('.comment:has(ol:has(li))').show();
          $(this).text('Hide all comments');
      }
      ,
      /* Off state */
      function() {
          $('.comment').hide();
          $(this).text('Show all comments');
      }
                                                  );

  // If we specified a fragment identifier, open the comments associated
  // with that resource
  if (document.location.hash != '') {
      var fragid = document.location.hash.replace('#c_', '');
      var goto = $('#c_' + fragid).offset().top;
      $('#comments_for_' + fragid).prev().click();
//      $('html').animate({scrollTop: goto});
      return true;
  }
});


